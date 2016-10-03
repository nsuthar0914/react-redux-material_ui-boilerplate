import constants from 'flux-constants';

// constants plugin will return object in this format: { ROUTE_CHANGE: "ROUTE_CHANGE" }
// so I don't have to type out duped strings
export default constants([
  "ADD_TODO",
  "DELETE_TODO",
  "EDIT_TODO",
  "COMPLETE_TODO",
  "COMPLETE_ALL",
  "CLEAR_COMPLETED"
]);