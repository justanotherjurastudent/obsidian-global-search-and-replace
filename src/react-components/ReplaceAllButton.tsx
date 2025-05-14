import * as React from "react";

interface ReplaceAllButtonProps {
	onClick: () => void;
}

export function ReplaceAllButton({ onClick }: ReplaceAllButtonProps) {
	return (
		<button className="document-search-button" onClick={onClick}>
			Replace all
		</button>
	);
}
