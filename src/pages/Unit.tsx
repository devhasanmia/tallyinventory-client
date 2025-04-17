
const Unit = () => {
  return (
    <div>
        <h1>All Unit</h1>
        <br />
        <div className="w-full overflow-x-auto rounded-lg shadow-md">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Abbreviation</th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        <tr className="hover:bg-gray-50 transition duration-200">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Pieces</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">pcs</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
  {/* Edit Button */}
  <a href="#" className="inline-flex items-center px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-200">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a2.123 2.123 0 011.42.588l1.596 1.595a2.125 2.125 0 01.588 1.421l-10.057 10.056-2.892.487a.375.375 0 01-.429-.429l.487-2.892L15.474 3.87a2.125 2.125 0 011.388-.38z" />
    </svg>
    Edit
  </a>

  {/* Delete Button */}
  <a href="#" className="inline-flex items-center ml-3 px-4 py-2 text-xs font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-200">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
    Delete
  </a>
</td>

                        </tr>

                    </tbody>
                </table>
            </div>
    </div>
  )
}

export default Unit