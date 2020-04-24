import React from 'react';
import Player from 'react-player'
import styled from 'styled-components'

const About = styled.div`
  margin: 16px 0px;
  p { 
    margin-bottom: 16px;
    font-size: 16px;
    line-height: 1.25em;
    text-rendering: optimizelegibility !important;
    letter-spacing: .03em;
  }

  img {
    margin-bottom: 16px;
    width: 100%;
    box-shadow: 0px 0px 5px rgba(0,0,0,0.3);
  }
`

export default () => (
  <div>
    <Player 
    url="https://www.youtube.com/embed/RbvUggaIzLU" 
    width="100%"
    />
    <About>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dui felis, fringilla quis elit quis, facilisis rhoncus turpis. Praesent eget elementum ex. Quisque dui libero, ultricies vel felis in, rhoncus vehicula elit. Curabitur auctor justo vel nulla interdum, nec posuere elit eleifend. Nam tellus dui, porta quis pretium a, pellentesque ac nulla. Ut bibendum leo vitae ligula molestie efficitur. Curabitur sed massa pulvinar, elementum sem a, varius ligula. Aliquam nisl mauris, finibus rutrum fringilla vitae, vehicula non sem. Donec sodales massa a pellentesque aliquet. Duis nec tortor eu ipsum lacinia mattis.</p>

    <p>Morbi in dictum risus. Integer placerat nunc dui, sed laoreet sapien posuere sagittis. Vivamus maximus accumsan malesuada. Morbi euismod orci vel nibh pharetra pretium vel et metus. Integer blandit semper ultricies. Quisque in urna nec felis iaculis accumsan non ut arcu. Phasellus a quam tincidunt, commodo augue vel, convallis sapien. Etiam ut vestibulum mauris. Nullam justo neque, efficitur at libero vitae, viverra congue metus. Curabitur posuere lectus lacinia erat eleifend, quis tempus ex mollis. Vestibulum eget porttitor diam. Aliquam egestas erat a dui faucibus, vel mattis sem molestie. In eget lectus justo. Aliquam laoreet justo at mauris dignissim maximus.</p>

    <p>Cras sit amet sapien fermentum, egestas nisl vitae, dignissim nisi. Proin ante nulla, facilisis eu orci sit amet, congue sollicitudin turpis. Etiam placerat nisl a nisi varius suscipit. Nulla non elit quam. Morbi porttitor eleifend arcu nec dictum. Maecenas quis dolor velit. Proin felis quam, tincidunt eu nisl non, porta commodo odio. Sed faucibus fermentum elementum. Proin egestas tortor in purus ultrices, sit amet placerat leo tempus. Fusce quis neque a justo pellentesque accumsan.</p>
    <img src="https://pbs.twimg.com/media/EUekU2iWoAUOjP7?format=jpg&name=large" />
    <p>Donec commodo ultrices risus, ac feugiat massa efficitur ut. Pellentesque commodo luctus tempor. Donec tristique sollicitudin sem rhoncus mattis. Sed vel lectus sollicitudin, dapibus massa nec, tempus dui. Proin tincidunt mi ut sem semper gravida. Praesent ullamcorper porttitor metus, non vulputate turpis faucibus eu. Phasellus dapibus nisl vel consectetur pellentesque. Praesent libero arcu, dapibus non elementum in, hendrerit sit amet libero. In malesuada odio orci, id ultricies arcu tincidunt non. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec interdum a arcu nec lobortis. Fusce lobortis posuere ante, at maximus quam vulputate luctus. Duis vel quam augue. Nunc lobortis ligula sed erat laoreet, mollis molestie nisi varius. Maecenas ut sagittis ante, pretium pellentesque urna.</p>

    <p>Nam risus enim, commodo nec semper nec, aliquet a nisl. Proin magna velit, elementum quis metus a, aliquet vulputate est. Proin volutpat ullamcorper pretium. Mauris nec vestibulum quam. Mauris tempor ligula a imperdiet faucibus. Phasellus rutrum faucibus odio, congue molestie mauris fermentum in. Praesent ultricies diam arcu, at pellentesque mauris tempus et. Curabitur condimentum, sem sit amet gravida euismod, massa enim blandit nunc, id rhoncus augue sem sit amet mi. Aenean fermentum eu sem vel eleifend.</p>
    </About>
  </div>
);
