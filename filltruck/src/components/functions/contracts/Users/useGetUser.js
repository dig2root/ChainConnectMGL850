import { useCall } from "@usedapp/core";
import { contract } from "./Contract";

export const useGetUser = (account) => {
    const result = useCall({
        contract: contract,
        method: 'getUser',
        args: [account]
    });

    return result;
};