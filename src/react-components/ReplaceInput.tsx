import * as React from "react";
import { ReplaceAllButton } from "./ReplaceAllButton";

interface ReplaceInputProps {
	value: string;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	onReplaceAll?: () => void;
}

export function ReplaceInput({ value, onChange, onReplaceAll }: ReplaceInputProps) {
	return (
		<div className="snr-input-button-wrapper">
			<input
				className="prompt-input"
				enterKeyHint="go"
				type="text"
				placeholder="Replace"
				value={value}
				onChange={onChange}
			/>
			{onReplaceAll && <ReplaceAllButton onClick={onReplaceAll} />}
		</div>
	);
}
