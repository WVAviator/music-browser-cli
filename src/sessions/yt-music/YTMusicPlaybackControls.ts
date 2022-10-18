import { Page } from 'puppeteer';
import { PlaybackActions, PlaybackControls } from '../base/PlaybackControls';

/**
 * An enum for the different types of controls that map to the appropriate selector in the DOM.
 */
export enum YTControl {
  PlayPause = `#play-pause-button`,
  Next = `tp-yt-paper-icon-button[title="Next song"]`,
  Previous = `tp-yt-paper-icon-button[title="Previous song"]`,
}

export class YTMusicPlaybackControls implements PlaybackControls {
  /**
   * A helper class for managing the playback controls of a YTMusicSession.
   */
  constructor(private page: Page) {}

  private async execute(control: YTControl) {
    await this.page.waitForSelector(control);
    await this.page.click(control);
  }

  /**
   * The available playback controls for a YTMusicSession.
   */
  public get controlActions(): PlaybackActions[] {
    return [
      { label: '⏮', value: () => this.execute(YTControl.Previous) },
      { label: '⏯', value: () => this.execute(YTControl.PlayPause) },
      { label: '⏭', value: () => this.execute(YTControl.Next) },
    ];
  }
}