const url = "https://api-emfoco.onrender.com/api";

const postFoco = async (foco) => {
  try {
      const responseOfAPI = await fetch(`${url}/focos`, {
      method: "POST",
      body: foco,
    });

    const focoSave = await responseOfAPI.json();
    console.log(focoSave);
    return focoSave;
  } catch (error) {
    console.error('Erro ao postar foco:', error);
    return null;
  }
};

const getAllFoco = async () => {
  try{
    const responseOfAPI = await fetch(`${url}/focos`, {
      cache: "no-cache"
    });
    const focos = await responseOfAPI.json();
    return focos;
  } catch {
    return null;
  }
}

const getOneFoco = async (id) => {
  try {
      const responseOfApi = await fetch(`${url}/focos/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'Application/json' },
      });
      const foco = await responseOfApi.json();
      return foco;
  } catch {
      return null;
  }
}

const updateFoco = async (id, foco,) =>{
  try{
      const responseOfApi = await fetch(`${url}/focos/${id}`, {
          method: 'PUT',
          headers: {"Content-Type": "Application/json"},
          body: JSON.stringify(foco)
      });
      const focoUpdate = await responseOfApi.json();
      console.log(focoUpdate)
      return focoUpdate;
  }
  catch{
      return null;
  }
}

export { getAllFoco, getOneFoco, postFoco, updateFoco };

