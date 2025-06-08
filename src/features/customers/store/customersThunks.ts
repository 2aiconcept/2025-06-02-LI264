// src/features/customers/store/customersThunks.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import { CustomersService } from "../services/Customers.service";
import type { ICustomer } from "../types/Customer.interface";

/**
 * Thunk pour récupérer la liste complète des clients.
 * createAsyncThunk gère le dispatch des actions pending/fulfilled/rejected pour nous.
 */
export const fetchAllCustomers = createAsyncThunk(
  // 1. On définit un nom de base unique pour notre thunk.
  //    RTK créera les types d'action 'customers/fetchAll/pending', 'customers/fetchAll/fulfilled', etc.
  "customers/fetchAll",
  // 2. Le "Payload Creator": la fonction asynchrone qui fait le travail.
  //    La signature de la fonction que vous passez à createAsyncThunk est (arg, thunkAPI).
  //    arg (le premier paramètre) : C'est la valeur que vous fournissez lorsque vous dispatchez le thunk depuis votre composant.
  //    si on écrivait le thunk deleteCustomer on lui passerait un id. (ici '_'), c'est une convention pour indiquer au thunk qu'on a
  //    aucun parametre à lui passer; L'action créé n'aura donc aucun payload
  //    thunkAPI (le deuxième paramètre) : C'est l'objet fourni par Redux qui contient des outils comme { dispatch, getState, rejectWithValue, ... }.
  //    d'où nous extrayons `rejectWithValue` à l'aide du destructuring (comme quand on récupère une props).
  async (_, { rejectWithValue }) => {
    try {
      // 3. On appelle notre service pour récupérer les données.
      const customersFromApi = await CustomersService.getAll();
      // 4. Si ça réussit, on retourne les données. Elles deviendront le payload de l'action 'fulfilled'.
      return customersFromApi;
    } catch (error) {
      // 5. Si ça échoue, on retourne une erreur propre avec rejectWithValue.
      //    Ceci deviendra le payload de l'action 'rejected'.
      const message =
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors du chargement des clients.";
      return rejectWithValue(message);
    }
  }
);

/**
 * Thunk pour récupérer un customer à partir de son id
 */
export const fetchCustomerById = createAsyncThunk(
  "customers/fetchCustomer",
  async (id: string, { rejectWithValue }) => {
    try {
      const customerFromApi = await CustomersService.getById(id);
      return customerFromApi;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors du chargement des clients.";
      return rejectWithValue(message);
    }
  }
);

/**
 * Thunk pour ajouter un customer
 */
export const addCustomerThunk = createAsyncThunk(
  "customers/addCustomer",
  async (customer: ICustomer, { rejectWithValue }) => {
    try {
      const customerFromApi = await CustomersService.create(customer);
      return customerFromApi;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors du chargement du client.";
      return rejectWithValue(message);
    }
  }
);

/**
 * Thunk pour update un customer
 */
export const updateCustomerThunk = createAsyncThunk(
  "customers/updateCustomer",
  async (customer: ICustomer, { rejectWithValue }) => {
    try {
      const customerFromApi = await CustomersService.update(customer);
      return customerFromApi;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors de l'update client.";
      return rejectWithValue(message);
    }
  }
);

/**
 * Thunk pour ajouter un customer
 */
export const deleteCustomerThunk = createAsyncThunk(
  "customers/deleteCustomer",
  async (id: string, { rejectWithValue }) => {
    try {
      await CustomersService.delete(id);
      return id;
      // l'api return un objet vide. on return l'id pour le cas ou l'on souhaiterai
      // créer dans customersSlide une action synchrone pour supprimer le customer du state
      // dans notre cas, nous voulons après une suppression faire un useAppdispatch(fetchAllCustomers)
      // dans notre composant pour refresh la collection depuis l'api.
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors de la suppression du client.";
      return rejectWithValue(message);
    }
  }
);
