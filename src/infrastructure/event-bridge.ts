import { KeymapEventListener } from "obsidian";

export class EventBridge {
	onArrowUp?: KeymapEventListener;
	onArrowDown?: KeymapEventListener;
	onEnter?: KeymapEventListener;
	onCommandEnter?: KeymapEventListener;
	onShiftEnter?: KeymapEventListener;
}

const eventBridge = new EventBridge();
export default eventBridge;
