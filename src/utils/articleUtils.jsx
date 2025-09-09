export const updateLocalArticleLikes = (articleId, isLike = true) => {
  const saved = localStorage.getItem("localArticles");
  if (!saved) return null;

  const localArticles = JSON.parse(saved);
  const updatedArticles = localArticles.map((a) =>
    String(a.id) === articleId 
      ? { 
          ...a, 
          [isLike ? 'likes' : 'dislikes']: (a[isLike ? 'likes' : 'dislikes'] || 0) + 1 
        }
      : a
  );
  
  localStorage.setItem("localArticles", JSON.stringify(updatedArticles));
  return updatedArticles.find(a => String(a.id) === articleId);
};