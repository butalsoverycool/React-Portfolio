import React from "react";
import styled from "styled-components";
import ViewTemplate from "../ViewTemplate";
import portraitSrc from "../../../media/kim_nkoubou_portrait.jpg";

const PieceTitle = styled.h3`
  font-weight: 700;
  font-size: 1.4em;
`;

const P = styled.p`
  font-size: 1em;
  line-height: 1.5em;
`;

const Link = styled.a`
  font-style: none;
  color: grey;
  font-weight: 700;
`;

const Portrait = styled.img`
  width: 200px;
  margin-left: 10px;
  margin-bottom: 10px;
  float: right;
`;

const Story = () => {
  return (
    <>
      <Portrait src={portraitSrc} />
      <P>
        My name is Kim Nkoubou, I'm a working musician but also an ambitious and
        positive (31 years old) front end-student at{" "}
        <Link href="https://kyh.se/utbildningar/front-end-developer/">KYH</Link>
      </P>

      <PieceTitle>Some about me</PieceTitle>

      <P>
        I embrace all life's challenges with a smile (and inner panic. No, jokes
        aside) and have always loved breathing within a creative atmosphere. No
        matter if it's music, coding or soccer I always work hard and try to
        make both myself and those around me better. For me a good working
        environment never comes for free and I'm always attentive to do what I
        can to enhance it. Previously I have worked with HTML, CSS, JS, ReactJS,
        NodeJS and WP. I have also done some MYSQL and PHP but I could always
        refresh those a bit. I was introduced to ReactJS and Styled Components
        relatively recently and I really love the combo. Furthermore, I'm very
        curious about the libraries Vue and Svelte(!).
      </P>

      <PieceTitle>Born and raised</PieceTitle>

      <P>
        in Lund (well, a{" "}
        <Link href="https://sv.wikipedia.org/wiki/S%C3%B6dra_Sandby">
          tiny kingdom
        </Link>{" "}
        about 8 farm fields out of town) by a Norwegian mother and a Congolese
        father as no. 2 of 5 happy demons with music and football (yes of course
        soccer) as my two great passions in life.
      </P>
      <P>
        Music won eventually (although I still make some magic in the 7th div.)
        and the road led to music highschool, jazz folk school (the swedish
        folkhögskola) and the music university of Gothenburg. The freelance life
        has since then been covering various contexts, ranging from jazz-gigs,
        church and wedding pianist, party-gigs and music production to writing
        music for and playing in theatre plays. In the summers of 2009 until
        2013 I worked as a pianist, drummer and accordion player at the park
        Astrid Lindgren's World.
      </P>
      <P>
        Moved to Stockholm in 2013 and started a production company with two
        friends and colleagues. We basically wrote and recorded pop music for
        artists and signed some upcoming ones. A couple of the collabs I really
        liked was{" "}
        <Link href="https://youtu.be/1rtl2GASQ-I">
          Kyss mig i slo-mo (Oscar Zia feat. Leslie Tay)
        </Link>{" "}
        and{" "}
        <Link href="https://open.spotify.com/album/7uG78cgUnT1jxEGUnctoum?si=6HZ0KOLOQsy3GnOfZeY8qA">
          Fuckgirl (Martin Masarov)
        </Link>{" "}
        which got its part in the Norwegian tv series SKAM. As for myself, I've
        released some music under Kim Koubou. During the summers since 2014 I've
        been composing and playing piano at a theatre at Skansen.
      </P>

      <P>
        I came across web development 2018 when I suddenly became restless and
        studied a year at University West (distance from Stockholm). At the time
        I didn't really know what web development was. During the first course
        (network administration and some firewall-stuff on Linux) I was honestly
        considering bailing. But when I got into HTML/CSS things started to
        turn... And when I finally was introduced to Javascript I was completely
        sold. At a creative level I found similarities with music, but at the
        same time this was a whole new world. A new fantastic point of view. No
        one to tell us, "No" Or where to go. Or say we're only drea.. Ok I truly
        apologize but I meant every word. When working on my first silly
        projects I also discovered that (after all) have two hemispheres, and a
        mind with interest in pure logic.
      </P>

      <P>
        Now I see my artistic background as a advantage (almost always) and
        several projects later I'm in the middle of studies at a professional
        university, getting better at ReactJS and will soon start to apply for
        jobs. Music will always be around but I've really found a new passion in
        programming and I will work hard to get as good as I can.
      </P>

      <P>
        Thanks for taking the time reading. If you feel like it, drop me a
        message on the contact page.
      </P>

      <P>
        <i>
          mä vä hä, <br />
          Kim Nkoubou
        </i>
      </P>
    </>
  );
};

const StoryView = props => {
  return (
    <>
      <ViewTemplate>
        <Story />
      </ViewTemplate>
    </>
  );
};

export default StoryView;
