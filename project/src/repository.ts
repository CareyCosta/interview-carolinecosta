export async function getAllGists(userName: string) {
  const url = `https://zapier-frontend-test-app.vercel.zapier-deployment.com/api/github/users/${userName}/gists`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    alert(`Error fetching gists for user ${userName}: ${error.message}`);
    return null;
  }
}

export async function getGist(id: string) {
  const url = `https://zapier-frontend-test-app.vercel.zapier-deployment.com/api/github/gists/${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    alert(`Error fetching gist: ${error.message}`);
    return null;
  }
}
