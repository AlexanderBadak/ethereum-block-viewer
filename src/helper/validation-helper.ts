class ValidationHelper {
    public static tryParseInt = (str: string | undefined | null, defaultValue: number) : number => {
        if (!str || str.length === 0) return defaultValue

        try {
            const parsedInt = parseInt(str)
            if (isNaN(parsedInt)) return defaultValue
            return parsedInt
        } catch {
            return defaultValue
        }
    }
}

export default ValidationHelper