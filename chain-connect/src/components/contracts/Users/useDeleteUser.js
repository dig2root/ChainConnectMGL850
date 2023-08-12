import { useContractFunction } from "@usedapp/core";
import { contract } from "./Contract";

export const useDeleteUser = () => {
    const { state, send } = useContractFunction(contract, "deleteUser", {
        transactionName: 'Delete user data',
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