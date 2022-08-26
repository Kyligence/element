import ElTableColumn from './src/table-column';
import ElTable from './src/table';
import ElTableDraggableWrapper from './src/table-draggable-wrapper';

/* istanbul ignore next */
export default function(Vue) {
  Vue.component(ElTable.name, ElTable);
  Vue.component(ElTableColumn.name, ElTableColumn);
  Vue.component(ElTableDraggableWrapper.name, ElTableDraggableWrapper);
};

export { ElTable, ElTableColumn, ElTableDraggableWrapper };
