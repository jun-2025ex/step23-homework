const form = document.getElementById("js-form");
const result = document.getElementById("js-result");

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // ページリロードを防ぐ

  const pokeName = event.target.pokeName.value.trim().toLowerCase();
  if (!pokeName) {
    result.textContent = "ポケモン名を入力してください。";
    return;
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
    if (!response.ok) {
      throw new Error("ポケモンが見つかりません！");
    }

    const data = await response.json();

    result.innerHTML = `
      <h2>${data.name}</h2>
      <p>高さ: ${data.height}</p>
      <p>重さ: ${data.weight}</p>
      <p>タイプ: ${data.types.map(t => t.type.name).join(", ")}</p>
    `;
  } catch (error) {
    result.textContent = "エラー: " + error.message;
  }
});