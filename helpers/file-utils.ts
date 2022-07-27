export async function getBase64FromUrl(url: string): Promise<string> {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result + "" || url;
      resolve(base64data);
    };
  });
}
