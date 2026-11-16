// Aurora 2.5.3 statically imports Waline even when all comment providers are disabled.
// Keep that unused module local; no remote SDK or fake working comment UI.
export function init(){throw new Error('Comments disabled. Use /corrections.');}
export function pageviewCount(){}
export function commentCount(){}
export function RecentComments(){}
