export async function getF1(path) {
  let response
  try {
    response = await fetch(`/api${path}`)
  } catch {
    throw new Error('C#-Webservice nicht erreichbar. Bitte zuerst dotnet run starten.')
  }

  let data
  try {
    data = await response.json()
  } catch {
    throw new Error(`Der Webservice hat keine JSON-Daten geliefert (HTTP ${response.status}).`)
  }

  if (!response.ok) throw new Error(data.error || 'Die Daten konnten nicht geladen werden.')
  return data
}

export function getStandings(year) {
  return getF1(`/seasons/${year}/standings`)
}
