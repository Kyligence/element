import ElTableDraggableWrapper from '../table/src/table-draggable-wrapper';

/* istanbul ignore next */
ElTableDraggableWrapper.install = function(Vue) {
  Vue.component(ElTableDraggableWrapper.name, ElTableDraggableWrapper);
};

export default ElTableDraggableWrapper;
