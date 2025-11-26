import { QUERY_STALE_TIME } from '@/lib/constant';
import { AutoCompleteAddressesResult, fetchAddresses } from '@/requests/queries/addresses-queries';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const useFetchAddresses = (searchInput: string): UseQueryResult<AutoCompleteAddressesResult[]> => {
  return useQuery({
    queryKey: ['addresses', searchInput],
    queryFn: async () => {
      if (searchInput.length < 4 || searchInput.length > 200) return [];
      return await fetchAddresses(searchInput);
    },
    staleTime: QUERY_STALE_TIME,
  });
};
