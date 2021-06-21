// Libraries
import {produce} from 'immer'

// Types
import {Secret, RemoteDataState, SecretsState, ResourceType} from 'src/types'
import {
  Action,
  REMOVE_SECRET,
  SET_SECRET,
  SET_SECRETS,
} from 'src/secrets/actions/creators'

// Utils
import {
  removeResource,
  setResource,
  setResourceAtID,
} from 'src/resources/reducers/helpers'

export const initialState = (): SecretsState => ({
  key: '',
  status: RemoteDataState.NotStarted,
  byID: {},
  allIDs: [],
})

export const secretsReducer = (
  state: SecretsState = initialState(),
  action: Action
): SecretsState =>
  produce(state, draftState => {
    switch (action.type) {
      case SET_SECRETS: {
        setResource<Secret>(draftState, action, ResourceType.Secrets)

        return
      }

      case SET_SECRET: {
        setResourceAtID<Secret>(draftState, action, ResourceType.Secrets)

        return
      }

      case REMOVE_SECRET: {
        removeResource<Secret>(draftState, action)

        return
      }
    }
  })
