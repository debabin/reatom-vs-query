import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
// import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

import { DependentQueriesExample } from './query/dependent-queries';
import { PersisterExample } from './query/persister';
import { PaginationExample } from './query/pagination';
import { LoadMoreExample } from './query/load-more';

const router = createBrowserRouter([
  {
    path: '/dependent-queries/:userId',
    element: <DependentQueriesExample />
  },
  {
    path: '/persister',
    element: <PersisterExample />
  },
  {
    path: '/pagination',
    element: <PaginationExample />
  },
  {
    path: '/loadmore',
    element: <LoadMoreExample />
  }
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

// const persister = createSyncStoragePersister({
//   storage: window.localStorage
// });

// const App = () => (
//   <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
//     <RouterProvider router={router} />
//   </PersistQueryClientProvider>
// );

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <RouterProvider router={router} />
  </QueryClientProvider>
);

export default App;
