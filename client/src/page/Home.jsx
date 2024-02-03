import IntroImage from "../assets/images/intro cleaner.jpg";
import Container from "../components/layout/ui/Container";

const Home = () => {
  return (
    <Container>
      <div className="flex my-[50px]">
        <div className="flex-[1] flex flex-col justify-around">
          <h1 className="text-5xl font-mono font-bold">
            Quality Cleaning <br />
            <span className="text-primary">for Your home</span>
          </h1>
          <p className="mb-2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus
            soluta voluptas autem! Repudiandae, qui ducimus?
          </p>
          <div >
            <button className=" btn btn-accent">Book a Service</button>
            <button className="btn btn-ghost ml-2 btn-sm">Read More</button>
          </div>
          <div className="divider"></div>
          <div className="flex items-center gap-3">
            <div className="avatar-group -space-x-6 rtl:space-x-reverse">
              <div className="avatar">
                <div className="w-12">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
            </div>

            <p>Rated 5 Out Of 5 Our Clients</p>
          </div>
        </div>
        <div className="flex-[1]  rounded-md overflow-hidden">
          <img src={IntroImage} className=" object-cover h-full" alt="" />
        </div>
      </div>
    </Container>
  );
};

export default Home;
