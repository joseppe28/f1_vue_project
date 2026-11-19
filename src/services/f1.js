export async function getF1(path) {
  const response = await fetch(`/api${path}`)
  const data = await response.json().catch(() => {
    throw new Error('C#-Webservice nicht erreichbar. Bitte zuerst dotnet run starten.')
  })
  if (!response.ok) throw new Error(data.error || 'Die Daten konnten nicht geladen werden.')
  return data
}

export function getStandings(year) {
  return getF1(`/seasons/${year}/standings`)
}
