import { Component, signal, inject } from '@angular/core'
import { CoreService } from '../../core/core.service'
import type { Topic } from '../../core/models'
import { RouterLink } from '@angular/router'
import { Header } from '../../components/header/header'
@Component({
  selector: 'app-home.page',
  imports: [RouterLink, Header],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export class HomePage {
  topics = signal<Topic[]>([])
  readonly coreService = inject(CoreService)

  constructor() {
    this.topics.set(this.coreService.getTopics())
  }
}
