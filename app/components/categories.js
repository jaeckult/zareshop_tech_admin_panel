export default function Categories() {
  return (
    <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
      <h1 className="text-2xl font-bold text-blue-800 mb-10">Categories</h1>
      <select name="cars" id="cars">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
    </aside>
  )
}
