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

    const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${data.id - 1}`);
    if (!response2.ok) {
      throw new Error("ポケモンが見つかりません！");
    }

    const data2 = await response2.json();

    const response3 = await fetch(`https://pokeapi.co/api/v2/pokemon/${data.id + 1}`);
    if (!response3.ok) {
      throw new Error("ポケモンが見つかりません！");
    }

    const data3 = await response3.json();

    result.innerHTML = `
      <h2>${data.name}</h2>
      <p>高さ: ${data.height}</p>
      <p>重さ: ${data.weight}</p>
      <p>タイプ: ${data.types.map(t => t.type.name).join(", ")}</p>
      <img src="${data.sprites.front_default}" alt="">

      <br/><br/>

      <h2>前のIDのポケモン：${data2.name}</h2>
      <p>高さ: ${data2.height}</p>
      <p>重さ: ${data2.weight}</p>
      <p>タイプ: ${data2.types.map(t => t.type.name).join(", ")}</p>
      <img src="${data2.sprites.front_default}" alt="">

      <br/><br/>
      
      <h2>後ろのIDのポケモン：${data3.name}</h2>
      <p>高さ: ${data3.height}</p>
      <p>重さ: ${data3.weight}</p>
      <p>タイプ: ${data3.types.map(t => t.type.name).join(", ")}</p>
      <img src="${data3.sprites.front_default}" alt="">
    `;
  } catch (error) {
    result.textContent = "エラー: " + error.message;
  }
});