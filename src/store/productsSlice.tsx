import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PRODUCTS_ENDPOINT } from "./api";
import type {  Product } from "./api";
import type { RootState } from "./store";

// ---- Thunks ----
export const fetchAllProducts = createAsyncThunk<Product[]>(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(PRODUCTS_ENDPOINT);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json()) as Product[];
    } catch (err: any) {
      return rejectWithValue(err?.message ?? "Failed to fetch products");
    }
  }
);

export const fetchProductById = createAsyncThunk<Product, string | number>(
  "products/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${PRODUCTS_ENDPOINT}/${id}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json()) as Product;
    } catch (err: any) {
      return rejectWithValue(err?.message ?? "Failed to fetch product");
    }
  }
);

export const fetchProductsBySection = createAsyncThunk<Product[], string>(
  "products/fetchBySection",
  async (section, { rejectWithValue }) => {
    try {
      const url = new URL(PRODUCTS_ENDPOINT);
      // MockAPI supports filtering via query? If not, we fetch all and filter client-side.
      // We’ll do the safe client-side filter after fetch:
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const all = (await res.json()) as Product[];
      return all.filter(p => p.section.toLowerCase() === section.toLowerCase());
    } catch (err: any) {
      return rejectWithValue(err?.message ?? "Failed to fetch by section");
    }
  }
);

export const fetchRelatedProducts = createAsyncThunk<
  Product[],
  { id: string | number; section: string }
>(
  "products/fetchRelated",
  async ({ id, section }, { rejectWithValue }) => {
    try {
      const res = await fetch(PRODUCTS_ENDPOINT);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const all = (await res.json()) as Product[];
      return all.filter(
        p =>
          p.section.toLowerCase() === section.toLowerCase() &&
          String(p.id) !== String(id)
      );
    } catch (err: any) {
      return rejectWithValue(err?.message ?? "Failed to fetch related products");
    }
  }
);

// ---- State ----
type ProductsState = {
  entities: Record<string, Product>; // by id
  allIds: string[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;

  bySection: Record<string, string[]>; // section -> [ids]
  related: Record<string, string[]>;   // productId -> [related ids]
  currentProductId?: string | null;
};

const initialState: ProductsState = {
  entities: {},
  allIds: [],
  status: "idle",
  error: null,
  bySection: {},
  related: {},
  currentProductId: null,
};

// ---- Slice ----
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCurrentProductId(state, action: PayloadAction<string | number | null>) {
      state.currentProductId = action.payload ? String(action.payload) : null;
    },
  },
  extraReducers: builder => {
    builder
      // all
      .addCase(fetchAllProducts.pending, state => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        const ids: string[] = [];
        action.payload.forEach(p => {
          const id = String(p.id);
          state.entities[id] = p;
          ids.push(id);
          const sectionKey = p.section.toLowerCase();
          if (!state.bySection[sectionKey]) state.bySection[sectionKey] = [];
          if (!state.bySection[sectionKey].includes(id)) {
            state.bySection[sectionKey].push(id);
          }
        });
        state.allIds = Array.from(new Set([...state.allIds, ...ids]));
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) ?? "Unknown error";
      })

      // byId
      .addCase(fetchProductById.pending, state => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        const p = action.payload;
        const id = String(p.id);
        state.entities[id] = p;
        if (!state.allIds.includes(id)) state.allIds.push(id);
        const sectionKey = p.section.toLowerCase();
        if (!state.bySection[sectionKey]) state.bySection[sectionKey] = [];
        if (!state.bySection[sectionKey].includes(id)) {
          state.bySection[sectionKey].push(id);
        }
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) ?? "Unknown error";
      })

      // bySection
      .addCase(fetchProductsBySection.pending, state => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductsBySection.fulfilled, (state, action) => {
        state.status = "succeeded";
        const sectionKey = action.meta.arg.toLowerCase();
        const ids: string[] = [];
        action.payload.forEach(p => {
          const id = String(p.id);
          state.entities[id] = p;
          if (!state.allIds.includes(id)) state.allIds.push(id);
          ids.push(id);
        });
        state.bySection[sectionKey] = ids;
      })
      .addCase(fetchProductsBySection.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) ?? "Unknown error";
      })

      // related
      .addCase(fetchRelatedProducts.pending, state => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        const sourceId = String(action.meta.arg.id);
        const ids: string[] = [];
        action.payload.forEach(p => {
          const id = String(p.id);
          state.entities[id] = p;
          if (!state.allIds.includes(id)) state.allIds.push(id);
          ids.push(id);
        });
        state.related[sourceId] = ids;
      })
      .addCase(fetchRelatedProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) ?? "Unknown error";
      });
  },
});

export const { setCurrentProductId } = productsSlice.actions;
export default productsSlice.reducer;

// ---- Selectors ----
export const selectProductsStatus = (s: RootState) => s.products.status;
export const selectProductsError = (s: RootState) => s.products.error;

export const selectAllProducts = (s: RootState): Product[] =>
  s.products.allIds.map(id => s.products.entities[id]).filter(Boolean) as Product[];

export const selectProductById = (id?: string | number) => (s: RootState): Product | undefined =>
  id == null ? undefined : s.products.entities[String(id)];

export const selectProductsBySection = (section: string) => (s: RootState): Product[] => {
  const key = section.toLowerCase();
  const ids = s.products.bySection[key] ?? [];
  return ids.map(id => s.products.entities[id]).filter(Boolean) as Product[];
};

export const selectRelatedFor = (id: string | number) => (s: RootState): Product[] => {
  const ids = s.products.related[String(id)] ?? [];
  return ids.map(i => s.products.entities[i]).filter(Boolean) as Product[];
};
