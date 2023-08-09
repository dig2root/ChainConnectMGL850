import { useContractFunction } from "@usedapp/core";
import { contract } from "./Contract";

export const useAddUser = (account) => {
    const { state, send } = useContractFunction(contract, "addUser", {
        transactionName: 'Add user',
        gasLimitBufferPercentage: 10,
    });
    const loading = state.status === "PendingSignature" || state.status === "Mining";
    const success = state.status === "Success";
    const error = state.status === "Fail" || state.status === "Exception";
    return {
        loading,
        success,
        error,
        send,
    };
};