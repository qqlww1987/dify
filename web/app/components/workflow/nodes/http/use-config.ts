import { useCallback } from 'react'
import produce from 'immer'
import { useBoolean } from 'ahooks'
import useVarList from '../_base/hooks/use-var-list'
import type { Authorization, Body, HttpNodeType, Method } from './types'
import useKeyValueList from './hooks/use-key-value-list'
import useNodeCrud from '@/app/components/workflow/nodes/_base/hooks/use-node-crud'

const useConfig = (id: string, payload: HttpNodeType) => {
  const { inputs, setInputs } = useNodeCrud<HttpNodeType>(id, payload)

  const { handleVarListChange, handleAddVariable } = useVarList<HttpNodeType>({
    inputs,
    setInputs,
  })

  const handleMethodChange = useCallback((method: Method) => {
    const newInputs = produce(inputs, (draft: HttpNodeType) => {
      draft.method = method
    })
    setInputs(newInputs)
  }, [])

  const handleUrlChange = useCallback((url: string) => {
    const newInputs = produce(inputs, (draft: HttpNodeType) => {
      draft.url = url
    })
    setInputs(newInputs)
  }, [])

  const {
    list: headers,
    setList: setHeaders,
    addItem: addHeader,
    isKeyValueEdit: isHeaderKeyValueEdit,
    toggleIsKeyValueEdit: toggleIsHeaderKeyValueEdit,
  } = useKeyValueList(inputs.headers)

  const {
    list: params,
    setList: setParams,
    addItem: addParam,
    isKeyValueEdit: isParamKeyValueEdit,
    toggleIsKeyValueEdit: toggleIsParamKeyValueEdit,
  } = useKeyValueList(inputs.params)

  const setBody = useCallback((data: Body) => {
    const newInputs = produce(inputs, (draft: HttpNodeType) => {
      draft.body = data
    })
    setInputs(newInputs)
  }, [inputs, setInputs])

  // authorization
  const [isShowAuthorization, {
    setTrue: showAuthorization,
    setFalse: hideAuthorization,
  }] = useBoolean(false)

  const setAuthorization = useCallback((authorization: Authorization) => {
    const newInputs = produce(inputs, (draft: HttpNodeType) => {
      draft.authorization = authorization
    })
    setInputs(newInputs)
  }, [inputs, setInputs])

  return {
    inputs,
    handleVarListChange,
    handleAddVariable,
    handleMethodChange,
    handleUrlChange,
    // headers
    headers,
    setHeaders,
    addHeader,
    isHeaderKeyValueEdit,
    toggleIsHeaderKeyValueEdit,
    // params
    params,
    setParams,
    addParam,
    isParamKeyValueEdit,
    toggleIsParamKeyValueEdit,
    // body
    setBody,
    // authorization
    isShowAuthorization,
    showAuthorization,
    hideAuthorization,
    setAuthorization,
  }
}

export default useConfig