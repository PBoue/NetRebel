export function searchDeep<T = any>(
    searchTerm: string,
    item: T,
    maxLevel: number = 999,
    level: number = 0,
    childrenKey: string = "children",
    excludeProperties: string[] = []
): boolean {
    if (!item) {
        return false;
    }
    if (level > maxLevel) {
        return false;
    }
    const lowerCaseTerm = (searchTerm || "").toLowerCase();
    if (typeof item === "string") {
        return item.toLocaleLowerCase().indexOf(lowerCaseTerm) > -1;
    }
    if (typeof item === "number") {
        return "" + item === searchTerm;
    }

    if (Array.isArray(item)) {
        return (
            item.filter((entry) =>
                searchDeep(
                    searchTerm,
                    entry,
                    maxLevel,
                    level,
                    childrenKey,
                    excludeProperties
                )
            ).length > 0
        );
    }

    const tmp: { [key: string]: any } = item,
        values = Object.keys(tmp)
            .filter((key) => key !== childrenKey)
            .filter((key) => excludeProperties.indexOf(key) === -1)
            .map((key) => tmp[key]),
        hasMatch = searchDeep(
            searchTerm,
            values,
            maxLevel,
            level,
            childrenKey,
            excludeProperties
        );
    if (hasMatch) {
        return true;
    }

    if (tmp[childrenKey]) {
        return searchDeep(
            searchTerm,
            tmp[childrenKey],
            maxLevel,
            level + 1,
            childrenKey,
            excludeProperties
        );
    }
    return false;
}
