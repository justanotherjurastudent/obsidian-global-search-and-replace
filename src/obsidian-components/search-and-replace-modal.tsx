import {App, Modal} from "obsidian";
import {createRoot, Root} from "react-dom/client";
import * as React from "react";
import SearchAndReplace from "../react-components/SearchAndReplace";
import eventBridge from "../infrastructure/event-bridge";
import {FileOperator} from "../domain/file-operator";

export class SearchAndReplaceModal extends Modal {
	private readonly reactRoot: Root;
	private readonly fileOperator: FileOperator;

	constructor(app: App, fileOperator: FileOperator) {
		super(app);
		this.prepareModalEl();
		this.reactRoot = createRoot(this.modalEl);
		this.registerEventListeners();
		this.fileOperator = fileOperator;
	}

	private prepareModalEl() {
		this.modalEl.replaceChildren();
		this.modalEl.addClass("prompt");
		this.modalEl.removeClass("modal");
	}

	private registerEventListeners() {
		// Move selection to previous note
		this.scope.register([], "ArrowUp", (e, ctx) => {
			e.preventDefault();
			eventBridge.onArrowUp?.(e, ctx);
		});

		// Move selection to next note
		this.scope.register([], "ArrowDown", (e, ctx) => {
			e.preventDefault();
			eventBridge.onArrowDown?.(e, ctx);
		});

		// Replace note at selectedIndex
		this.scope.register([], "Enter", (e, ctx) => {
			e.preventDefault();

			// Prevent press and hold
			if (e.repeat) return;

			eventBridge.onEnter?.(e, ctx);
		});

		// Open note at selectedIndex
		this.scope.register(["Mod"], "Enter", (e, ctx) => {
			e.preventDefault();

			// Prevent press and hold
			if (e.repeat) return;

			eventBridge.onCommandEnter?.(e, ctx);
			this.close();
		});

		// Replace all matches (Shift+Enter)
		this.scope.register(["Shift"], "Enter", (e, ctx) => {
			e.preventDefault();
			if (e.repeat) return;
			eventBridge.onShiftEnter?.(e, ctx);
		});
	}

	onOpen() {
		this.reactRoot.render(
			<SearchAndReplace fileOperator={this.fileOperator}/>
		);
	}

	onClose() {
		this.reactRoot.unmount();
	}
}
