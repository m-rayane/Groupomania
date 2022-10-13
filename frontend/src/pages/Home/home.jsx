import PopularPost from "../../components/Post/popular";
import { HomeWrapper, HomeContainer, StyledTitle, MiddleCol, RightCol } from "../../utils/style/home";

// import Forum from "../../components/Post/postOffice";



function Home() {
  return (
    <HomeWrapper>
      <HomeContainer>
        <MiddleCol>

          <StyledTitle>
             
          </StyledTitle>

        </MiddleCol>
        <RightCol>

          <StyledTitle>
              <PopularPost/>
          </StyledTitle>  

        </RightCol>
      </HomeContainer>
    </HomeWrapper>
  );
}

export default Home;
