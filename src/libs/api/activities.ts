import { ActivityFormValues } from "../schemas/activity";
import agent from "./agent";

export async function getActivities({ cursor }: { cursor: string }) {
  try {
    const response = await agent.get<CursorPagedList<Activity>>(`/activities`, {
      params: { cursor },
    });
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

export async function createActivity(activity: ActivityFormValues) {
  try {
    const response = await agent.post(`/activities`, activity);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateActivity(id: string, activity: ActivityFormValues) {
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

export async function updateAttendee(id: string) {
  try {
    const response = await agent.post(`/activities/${id}/attend`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
