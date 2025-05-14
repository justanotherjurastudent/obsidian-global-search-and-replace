import * as React from "react";
import { useCallback } from "react";
import { FileOperator } from "../domain/file-operator";
import { SearchAndReplaceAction, SearchAndReplaceState } from "./SearchAndReplace";

export function useReplaceAll(
	state: SearchAndReplaceState,
	dispatch: React.Dispatch<SearchAndReplaceAction>,
	fileOperator: FileOperator
) {
	return useCallback(async () => {
		if (state.searchResults.length === 0) return;

		for (let i = 0; i < state.searchResults.length; i++) {
			await fileOperator.replace(
				state.searchResults[i],
				state.replacementText,
				state.searchQuery,
				state.regexEnabled,
				state.caseSensitivityEnabled
			);
		}
		dispatch({ type: "clear" });
	}, [dispatch, fileOperator, state]);
}
