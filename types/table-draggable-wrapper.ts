import { ElementUIComponent } from './component';

/** TableDraggableWrapper Component */
export declare class ElTableDraggableWrapper extends ElementUIComponent {
  /** draggable handler */
  handle: string;

  /** drag start */
  drag(index: number): void;

  /** drag end */
  drop(e: {
    newIndex: number;
    oldIndex: number;
    target: object;
    list: object[];
  }): void;
}
