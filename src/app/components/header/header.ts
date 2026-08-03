import { Location } from '@angular/common'
import { Component, inject, input } from '@angular/core'
import { RouterLink } from '@angular/router'
import { ChevronLeftIcon } from '../icons/chevron-left-icon'

@Component({
  selector: 'app-header',
  imports: [RouterLink, ChevronLeftIcon],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private readonly location = inject(Location)

  title = input('StudyFlash')
  subTitle = input<string>()
}
