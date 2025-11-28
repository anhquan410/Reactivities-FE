import agent from "./agent";

export async function getActivities() {
  try {
    const response = await agent.get<Activity[]>(`/activities`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getActivityById(id: string) {
  try {
    const response = await agent.get<Activity>(`/activities/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function createActivity(activity: Activity) {
  try {
    const response = await agent.post(`/activities`, activity);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateActivity(id: string, activity: Activity) {
  try {
    const response = await agent.patch(`/activities/${id}`, activity);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteActivity(id: string) {
  try {
    const response = await agent.delete(`/activities/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
