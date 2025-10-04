"use client";

import { useWindowManager } from './WindowManager';
import Window from './Window';
import Calculator from './apps/Calculator';
import MusicPlayer from './apps/MusicPlayer';
import NavigationApp from './apps/NavigationApp';
import RouteFrame from './apps/RouteFrame';
import { MdCalculate, MdMusicNote, MdApps, MdLanguage } from 'react-icons/md';

export default function WindowRenderer() {
  const { windows } = useWindowManager();

  return (
    <>
      {windows.map((config) => {
        let content;
        let icon;

        switch (config.type) {
          case 'calculator':
            content = <Calculator />;
            icon = <MdCalculate />;
            break;
          case 'music':
            content = <MusicPlayer />;
            icon = <MdMusicNote />;
            break;
          case 'navigation':
            content = <NavigationApp />;
            icon = <MdApps />;
            break;
          case 'route':
            content = config.route ? <RouteFrame route={config.route} /> : <div>No route specified</div>;
            icon = <MdLanguage />;
            break;
          default:
            content = <div>Unknown app</div>;
        }

        return (
          <Window key={config.id} config={config} icon={icon}>
            {content}
          </Window>
        );
      })}
    </>
  );
}
