import {useEffect, useState} from "react";
import {SettingsData} from "../services/types.ts";

export const useSettings = () => {
    const [settings, setSettings] = useState<SettingsData>();
    useEffect(() => {
        (async () => {
            fetch(`${window.location.href.replace(/\/[^/]*$/, '/')}/settings.json`, {cache: "no-store"})
                // fetch(`../../../settings.json`, {cache: "no-store"})
                .then(response => response.json())
                .then(data => setSettings(data))
        })();
    }, [])

    return settings
};

