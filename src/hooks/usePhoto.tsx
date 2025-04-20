import { useEffect, useState } from "react"
import apiClient from "../apiClient/ApiClient"

function usePhoto<T>(path: string) {
    const [data, setData] = useState<T[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [pageSize, setPageSize] = useState<number>(0)

    useEffect(() => {
        setLoading(true)
        apiClient.get(path).then(res => {
            setData(res.data)
            setPageSize(res.headers['x-total-count'])
        }).catch(err => {
            setError(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }, [path])

    return {
        data,
        setData,
        loading,
        setLoading,
        error,
        setError,
        pageSize,
        setPageSize
    }
}

export default usePhoto