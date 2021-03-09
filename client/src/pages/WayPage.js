import st from './TodosPage.module.css'

export const WayPage = () => {
  return (
    <div className={st.container}>
      <div>
        <h2>Streamline to become a FullStackDeveloper</h2>
        <iframe
          src="https://www.youtube.com/embed/181VnUUJq-Y"
          title="Guideline"
          frameBorder="0"
          // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div>
        <h2>MERN concept</h2>
        <iframe
          src="https://www.youtube.com/embed/ivDjWYcKDZI"
          title="myWay"
          frameBorder="0"
          // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div>
        <h2>Webpack freecodcamp.org concept</h2>
        <iframe
          src="https://www.youtube.com/embed/MpGLUVbqoYQ"
          title="myWay"
          frameBorder="0"
          // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};
