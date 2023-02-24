

import {Directive, HostBinding, Input} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Directive({
  selector: '[appSanitizeHtml]'
})
export class appSanitizeHtmlDirective {

  @Input() sanitizeHtml: any;

  constructor(private sanitizer: DomSanitizer) {
  }

  @HostBinding('innerHtml')
  get innerHtml(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.sanitizeHtml);
  }

}
