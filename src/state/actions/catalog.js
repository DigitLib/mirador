import ActionTypes from './action-types';

/**
 * add a manifest to the resource catalog
 * @param {string} manifestId
 */
export function addResource(manifestId) {
  return { manifestId, type: ActionTypes.ADD_RESOURCE };
}

/** remove a manifest from the resource catalog */
export function removeResource(manifestId) {
  return {
    manifestId,
    type: ActionTypes.REMOVE_RESOURCE,
  };
}
