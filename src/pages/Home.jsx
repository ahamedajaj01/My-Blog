import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-white text-gray-800 dark:bg-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-20 px-4 text-center dark:from-gray-900 dark:to-pink-200">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to <span className="text-yellow-300">MyBlog</span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
          Share your thoughts, ideas, and stories with the world. Start your blogging journey today!
        </p>
        <Link
          to="/signup"
          className="inline-block bg-yellow-400 text-purple-800 font-semibold px-6 py-3 rounded hover:bg-yellow-300 transition"
        >
          Create Your First Blog
        </Link>
      </section>

      {/* Placeholder Cards */}
      <section className="py-16 px-4 max-w-6xl mx-auto ">
        <h2 className="text-3xl font-bold text-center mb-12">Why Start Blogging?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition dark:bg-gray-800 dark:text-white">
            <img
              src="https://images.unsplash.com/photo-1725402694495-7f133a62c4bb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvdmUlMjB5b3Vyc2VsZnxlbnwwfHwwfHx8MA%3D%3D"
              alt="Write freely"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2 dark:text-white">Express Yourself</h3>
              <p className="text-sm text-gray-600 dark:text-white">
                Blogging gives you the freedom to express your thoughts and connect with others.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition dark:bg-gray-800 dark:text-white">
            <img
              src="https://plus.unsplash.com/premium_photo-1706061116343-c3f58257634c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXVkaWVuY2UlMjBjb21tdW5pdHl8ZW58MHx8MHx8fDA%3D"
              alt="Audience"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2 dark:text-white">Build an Audience</h3>
              <p className="text-sm text-gray-600 dark:text-white">
                Share your knowledge and grow a loyal reader base who value your voice.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition dark:bg-gray-800 dark:text-white">
            <img
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FyZWVyfGVufDB8fDB8fHww"
              alt="Career"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2 dark:text-white">Grow Professionally</h3>
              <p className="text-sm text-gray-600 dark:text-white">
                Documenting your thoughts online builds a digital identity and opens new doors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-100 py-16 px-4 text-center dark:bg-gray-700 dark:text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to share your story?</h2>
        <p className="text-lg mb-6">Join the community of storytellers and bloggers now.</p>
        <Link
          to="/signup"
          className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-6 py-3 rounded"
        >
          Sign Up & Start Writing
        </Link>
      </section>
    </div>
  );
}
