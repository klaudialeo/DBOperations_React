import { useState, useEffect } from 'react';

const getJson = async function (path) {
    let response = await fetch("http://localhost:8080" + path);
    return response.json().then(parsed => {
        return parsed;
    }).catch((e) => {
        console.log(e);
    })
}

export default function useJson(path) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        setLoading(true);
        getJson(path)
            .then(data => {
                if (data) {
                    setData(data);
                    setError(null);
                    setLoading(false);
                } else {
                    setData(null);
                    setError("404 - Error");
                    setLoading(false);
                }
            })
            .catch((e) => {
                setData(null);
                setError(e);
                setLoading(false);
            })
    }, [path]);

    return [data, loading, error];
}