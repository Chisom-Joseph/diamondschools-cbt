module.exports = async () => {
  try {
    return [{ name: "A" }, { name: "B" }, { name: "C" }, { name: "D" }].sort(
      (a, b) => a.name.localeCompare(b.name)
    );
  } catch (error) {
    console.log(error);
    return [];
  }
};
