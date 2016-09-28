const CACHE_KEY_MAP = {
    'alias-code': '__A_T_C',
    'alias-user': '__ALIAS_TO_USER',
    'alias-project': 'ALIAS_TO_PROJECT',
    'getParams': '__DATA__LOG__USER'
}

function cacheKey (key, type) {
    return CACHE_KEY_MAP[type] + key
}

module.exports = cacheKey