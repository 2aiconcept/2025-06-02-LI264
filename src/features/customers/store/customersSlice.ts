import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICustomer } from "../types/Customer.interface";
import {
  addCustomerThunk,
  deleteCustomerThunk,
  fetchAllCustomers,
  fetchCustomerById,
  updateCustomerThunk,
} from "./customersThunks";

// 1. Définition de l'état
interface CustomersState {
  customers: ICustomer[];
  currentCustomer: ICustomer | null;
  loading: boolean;
  error: string | null;
}

// 2. Définir l'état initial pour notre slice
export const initialState: CustomersState = {
  customers: [],
  currentCustomer: null,
  loading: false,
  error: null,
};

// 3. Création du slice (combine reducer et actions)
const customersSlice = createSlice({
  // Le nom de notre slice. Il sera utilisé comme préfixe pour les types d'action crées directement dans createSlide().
  name: "Customers",
  // L'état initial que nous venons de définir.
  initialState,
  // La section 'reducers' est pour les actions synchrones.
  reducers: {
    // ici les actions synchrones
    // ex si user se déconnecte et vous voulez vider le state
    // resetCustomersState(state) => {
    //    state = initialState
    // }, ...
  },
  // La section 'extraReducers' est pour réagir aux actions définies en dehors du slice,
  // comme celles générées automatiquement par notre createAsyncThunk.
  extraReducers: (builder) => {
    // Nous utilisons la syntaxe "builder" pour ajouter des cas de gestion d'action.
    builder
      // Cas 1 : Que faire quand le thunk `fetchAllCustomers` est en état 'pending' (en attente) ?
      .addCase(fetchAllCustomers.pending, (state) => {
        // On met 'loading' à true pour pouvoir afficher un spinner dans l'UI.
        state.loading = true;
        // On nettoie les erreurs précédentes.
        state.error = null;
      })
      // Cas 2 : Que faire quand le thunk `fetchAllCustomers` est en état 'fulfilled' (réussi) ?
      .addCase(
        fetchAllCustomers.fulfilled,
        (state, action: PayloadAction<ICustomer[]>) => {
          // On arrête le chargement.
          state.loading = false;
          // On met à jour notre liste de clients avec les données reçues dans le payload de l'action.
          state.customers = action.payload;
        }
      )
      // Cas 3 : Que faire quand le thunk `fetchAllCustomers` est en état 'rejected' (échoué) ?
      .addCase(fetchAllCustomers.rejected, (state, action) => {
        // On arrête le chargement.
        state.loading = false;
        // On stocke le message d'erreur (qui vient de rejectWithValue) dans le state.
        state.error = action.payload as string; // On s'attend à recevoir une chaîne de caractères.
      })
      // fetCustomerById
      .addCase(fetchCustomerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCustomerById.fulfilled,
        (state, action: PayloadAction<ICustomer | null>) => {
          state.loading = false;
          state.currentCustomer = action.payload;
        }
      )
      .addCase(fetchCustomerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // add customer
      .addCase(addCustomerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addCustomerThunk.fulfilled,
        (state, action: PayloadAction<ICustomer>) => {
          state.loading = false;
          state.customers.push(action.payload);
        }
      )
      .addCase(addCustomerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // update  customer
      .addCase(updateCustomerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateCustomerThunk.fulfilled,
        (state, action: PayloadAction<ICustomer>) => {
          state.loading = false;
          const index = state.customers.findIndex(
            (p) => p.id === action.payload.id
          );
          if (index !== -1) {
            state.customers[index] = action.payload;
          }
        }
      )
      .addCase(updateCustomerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // delete customer
      .addCase(deleteCustomerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteCustomerThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.customers = state.customers.filter(
            (c) => c.id !== action.payload
          );
          if (state.currentCustomer?.id === action.payload) {
            state.currentCustomer = null;
          }
        }
      )
      .addCase(deleteCustomerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// 3. Export des actions synchrone et du reducer
// export const {
//   resetCustomersState,
//   // autres...
// } = customersSlice.actions;

// 4. On exporte le reducer principal du slice.
//    C'est lui qu'on ajoutera à notre store global dans src/store/index.ts.
export default customersSlice.reducer;
