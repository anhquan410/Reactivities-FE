import agent from "./agent";

export async function getProfile(id: string) {
  try {
    const response = await agent.get<Profile>(`/profiles/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateProfile(id: string, profile: Profile) {
  try {
    const response = await agent.patch<Profile>(`/profiles/${id}`, profile);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getProfilePhotos(id: string) {
  const response = await agent.get<Photo[]>(`/profiles/${id}/photos`);
  return response.data;
}
