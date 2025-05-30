const form = document.getElementById("searchForm");
const input = document.getElementById("usernameInput");
const profileContainer = document.getElementById("profileContainer");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = input.value.trim();

  if (username === "") return;

  profileContainer.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      profileContainer.innerHTML = "<p>User not found!</p>";
      return;
    }

    const data = await response.json();

    profileContainer.innerHTML = `
      <img src="${data.avatar_url}" alt="Avatar" />
      <h3>${data.name || data.login}</h3>
      <p>${data.bio || "No bio available."}</p>
      <p><strong>Followers:</strong> ${data.followers}</p>
      <p><strong>Following:</strong> ${data.following}</p>
      <p><strong>Public Repos:</strong> ${data.public_repos}</p>
      <a href="${data.html_url}" target="_blank">Visit Profile</a>
    `;
  } catch (error) {
    profileContainer.innerHTML = "<p>Something went wrong!</p>";
    console.error(error);
  }
});
